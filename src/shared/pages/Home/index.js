import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import Button from "../../components/atoms/Button";

export default function Home() {
  async function doLogout(params) {
    try {
      await Parse.User.logOut();
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert("Success! No user is logged in anymore!");
      }
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  return (
    <div className="container text-center pt-5">
      <h3 className="mb-3">Bem vindo!</h3>
      <Button
        type="button"
        buttonstyle="secondary text-center mb-4"
        onClick={(e) => {
          doLogout();
        }}
      >
        Sair
      </Button>
    </div>
  );
}
