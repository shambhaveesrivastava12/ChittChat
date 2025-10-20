import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import "../home/Home.css"
// import ProfileButton from "../../components/profile/ProfileButton";

const Home = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-gray-900/50'>
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};
export default Home;