import useRefreshToken from "../hooks/useRefreshToken";

const Home = () => {
    // const refresh = useRefreshToken();

    return ( 
        <div className="homepage">
            <h1 className="welcomeText">Welcome to this application</h1>
            <h4>Get started by navigating to one of the pages on the sidebar</h4>
            {/* <button onClick={() => refresh()}>Refresh</button> */}
        </div>
     );
}
 
export default Home;