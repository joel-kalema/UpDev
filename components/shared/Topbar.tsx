import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

import { FaPlus, FaHistory } from "react-icons/fa";

function Topbar() {
    return (
        <nav className='topbar border-b border-[#ffffff23]'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/updev.png' alt='logo' width={40} height={40} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Updev</p>
            </Link>

            <div className="flex gap-3 text-[.8rem]">
                <Link href="/activity" className="flex text-light-1 items-center gap-1 border border-[#ffffff23] py-1 px-2 hover:bg-[#ffffff0f]">
                <FaHistory />
                    <p>Activity</p>
                </Link>

                <Link href="/create-post" className="flex text-light-1 items-center gap-1 border border-[#ffffff23] py-1 px-2 hover:bg-[#ffffff0f]">
                    <FaPlus />
                    <p>Create</p>
                </Link>
            </div>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    <SignedIn>
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image
                                    src='/assets/logout.svg'
                                    alt='logout'
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        },
                    }}
                />
            </div>
        </nav>
    );
}

export default Topbar;