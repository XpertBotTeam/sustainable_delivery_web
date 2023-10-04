
const useUserAuth = async () => {

  const authToken = localStorage.getItem("JWT");

  if (authToken) {
    //request headers
    var myHeaders = new Headers();
    myHeaders.append("jwt", authToken);

    //request options
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
        //send authCheck request
      const response = await fetch(
        "http://localhost:3000/auth/getUserAuth",
        requestOptions
      );
      if (!response.ok) {
        localStorage.removeItem("JWT"); // Remove the JWT token from local storage
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //extract data
      const data = await response.json();

      if(!data.authorized === true){
        //clear token (must be expired)
        localStorage.removeItem("JWT"); // Remove the JWT token from local storage
      }

      //return authData
      return { authorized: data.authorized, userType: data.userType, JWT: authToken,user:data.user };

    } catch (error) {
      console.error("Error fetching data:", error);
      return { authorized: false, userType: null, JWT: null,user:null };
    }
  } else {
    return { authorized: false, userType: null, JWT: null,user:null };
  }
  
}

export { useUserAuth };