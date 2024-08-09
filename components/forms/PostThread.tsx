"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { parseContent } from "@/utils/parseContent";
import { content } from "@/utils/langages";
import { Typewriter } from "react-simple-typewriter";

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();

    const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([]);

    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    // Flatten the content array into a single string, then split and filter it
    const animation = content.join('\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const handleContentChange = (value: string) => {
        form.setValue("thread", value); // Update form state
        setParsedContent(parseContent(value)); // Pass textContent to parseContent
    };

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        });

        router.push("/");
    };

    return (
        <Form {...form}>
            <form
                className='mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >


                {/* Example Typewriter usage for some static content */}
                <div className="flex text-light-2 text-[13px]">
                    <p className="mr-2">to add code:</p>
                    <div className='bg-[#ffffff1b] p-1'>
                        <Typewriter
                            words={animation}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={90}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                        <p className="ml-2">code_</p>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-[#262626a5] text-light-1'>
                                <Textarea
                                    rows={15}
                                    {...field}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <h1 className='text-base-semibold text-light-2'>Preview</h1>
                    <div className="preview-area p-3 bg-[#ffffff11]">
                        {parsedContent}
                    </div>
                </div>



                <Button type='submit' className='bg-[#fff2] border-[#ffffff23] hover:bg-[#ffffff2c]'>
                    Post
                </Button>
            </form>
        </Form>
    );
}

export default PostThread;
