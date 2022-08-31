import axios from "axios";

const baseURL = "http://localhost:3000/auth/jwt/";

export interface ILoginProps {
    setLoginToken : (token: string) => void;
}

function Login(props: ILoginProps) {

    function onLogin() {
        axios.post(baseURL + 'sign', {
            "email": "irgendeine@email.adresse", "password": "m294"
        }).then((response) => {
            console.log(response);
            let token = response.data.token;
            props.setLoginToken(token);
        });
    }
    return (
        <button onClick={onLogin}>Test Login Token</button>
    )
}

export default Login