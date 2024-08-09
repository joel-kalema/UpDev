import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  const userInfo = await fetchUser(user.id);

  // const userInfo = await fetchUser(params.id);

  return (
    <section className='custom-scrollbar rightsidebar border-r border-[#ffffff23]'>
      
      <div className="flex w-[320px] flex-1 flex-col justify-start">
        <ProfileHeader
          accountId={userInfo.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          bio={userInfo.bio}
        />
      </div>

      <div className='flex w-[320px] flex-1 flex-col justify-start bg-[#ffffff0f] p-6 rounded-lg border border-[#ffffff23]'>
        <h3 className='text-heading4-medium text-light-1 mb-4'>
        Trends for you
        </h3>
        <p className="text-gray-1 text-small-medium">Don't miss out on what's happening in the world of development. Join the community and start collaborating today!</p>

        <div className='mt-7 flex  flex-col gap-9'>
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className='flex flex-1 w-[320px] flex-col justify-start bg-[#ffffff0f] p-6 rounded-lg border border-[#ffffff23]'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
        <div className='mt-7 flex flex-col gap-10'>
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div>
      </div>

      <div className='flex flex-1 w-[320px] flex-col justify-start pb-10'>
        <h3 className='text-heading4-medium text-light-1 mb-4'>About UpDev</h3>
        <p className="text-gray-1 text-small-medium">UpDev is a thriving ecosystem designed to support your journey as a developer. Whether you're here to learn, share, or collaborate, we provide the tools and community you need to succeed. Join UpDev today and be a part of the future of development!</p>
      </div>
    </section>
  );
}

export default RightSidebar;
