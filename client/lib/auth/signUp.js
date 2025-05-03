import axios from "axios";

const handleSignUp = async ({ endpoint, data }) => {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response:::", response);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    console.log("error:::", error);
    return error.response;
  }
};

export { handleSignUp };
