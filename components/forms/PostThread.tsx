"use client"

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
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod"

import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";

// import { UserValidation } from "@/lib/validations/user";
// import { updateUser } from "@/lib/actions/user.actions";


import { ThreadValidation } from "@/lib/validations/thread";

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
  
    const form = useForm<z.infer<typeof ThreadValidation>>({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread: "",
        accountId: userId,
      },
    });
  
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
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-[#262626a5] text-light-1'>
                                <Textarea rows={10} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='bg-[#fff2] border-[#ffffff23] hover:bg-[#ffffff2c]'>
                    Post
                </Button>
            </form>
        </Form>
    )
}

export default PostThread;