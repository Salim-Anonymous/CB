import {ChatIcon,BookmarkIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon} from "@heroicons/react/outline";


const posts = [
    {
        id: 1,
        username: 'johndoe',
        userImg: 'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/307773031_101328909418186_6024367239630506673_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qQ4XF2WsDfsAX_yRD_P&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8oNsuyLdRzDacYSWLQdR21IPqymNPrmCZe7w_mV14deQ&oe=63599EB5',
        img: 'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/307773031_101328909418186_6024367239630506673_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qQ4XF2WsDfsAX_yRD_P&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8oNsuyLdRzDacYSWLQdR21IPqymNPrmCZe7w_mV14deQ&oe=63599EB5',
        caption: 'WOW this works',
    },
    {
        id: 1,
        username: 'johndoe',
        userImg: 'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/307773031_101328909418186_6024367239630506673_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qQ4XF2WsDfsAX_yRD_P&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8oNsuyLdRzDacYSWLQdR21IPqymNPrmCZe7w_mV14deQ&oe=63599EB5',
        img: 'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/307773031_101328909418186_6024367239630506673_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=qQ4XF2WsDfsAX_yRD_P&_nc_ht=scontent.fdel29-1.fna&oh=00_AT8oNsuyLdRzDacYSWLQdR21IPqymNPrmCZe7w_mV14deQ&oe=63599EB5',
        caption: 'WOW this works',
    },
]

function Posts(){
    return (
        <div className="">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

function Post({
    id,
    username,
    userImg,
    img,
    caption,}:{
    id: number,
    username:string,
    userImg:string,
    img:string,
    caption:string,
}){
    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} alt={username} className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5"/>
            </div>
            {/* Img */}
            <img src={img} alt="" className="object-cover w-full rounded-3xl border"/>
            {/* Buttons */}
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <HeartIcon className="btn" />
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>
            {/* Caption */}
            <p className="p-5 truncate">
                <span className="font-bold mr-1">{username} </span>
                {caption}
            </p>
            {/* Comments */}
            <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                <p className="mb-1">
                    <span className="font-bold mr-1">johndoe </span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.
                </p>
                <p className="mb-1">
                    <span className="font-bold mr-1">johndoe </span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.
                </p>
            </div>
            {/* Input Box */}
            <div className="flex items-center p-4 border-t">
                <EmojiHappyIcon className="h-7"/>
                <form className="flex flex-1">
                    <input type="text" placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none"/>
                    <button className="font-semibold text-blue-400">Post</button>
                </form>
            </div>
            {/* Likes */}
        </div>
    );
}

export default Posts
