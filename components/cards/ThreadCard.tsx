// components/ThreadCard.tsx

import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import { parseContent } from "@/utils/parseContent";

interface ThreadCardProps {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
}

function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment = false,
}: ThreadCardProps) {
    return (
        <article
            className={`flex w-full flex-col ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7 border border-[#ffffff23]"}`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt={`Profile image of ${author.name}`}
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>
                        <div className='thread-card_bar mb-2' />
                        <div className="flex flex-col justify-center items-center h-[]">
                            <div className='thread-card_bar mb-2' />
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffffff96] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffffff96]"></span>
                            </span>
                        </div>
                    </div>
                    <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                {author.name}
                            </h4>
                        </Link>
                        <div className='mt-2 text-small-regular text-light-2'>
                            <div className="w-full">{parseContent(content)}</div>
                        </div>
                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            <div className='flex gap-3.5'>
                                <Image
                                    src='/assets/heart-gray.svg'
                                    alt='Heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src='/assets/reply.svg'
                                        alt='Reply'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                </Link>
                                <Image
                                    src='/assets/repost.svg'
                                    alt='Repost'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                <Image
                                    src='/assets/share.svg'
                                    alt='Share'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>
                                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <DeleteThread
                    threadId={id}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                />
            </div>
            {!isComment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`Comment author ${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 ? "-ml-5" : ""} rounded-full object-cover`}
                        />
                    ))}
                    <Link href={`/thread/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}
            {!isComment && community && (
                <Link
                    href={`/communities/${community.id}`}
                    className='mt-5 flex items-center'
                >
                    <p className='text-subtle-medium text-gray-1'>
                        {formatDateString(createdAt)}
                        {community && ` - ${community.name} Community`}
                    </p>
                    <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className='ml-1 rounded-full object-cover'
                    />
                </Link>
            )}
        </article>
    );
}

export default ThreadCard;
