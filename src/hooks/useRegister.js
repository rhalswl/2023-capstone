import { useEffect, useState } from "react";
import { BASE_API_URI, emailRegEx } from "../util/common";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useRegister() {
  const [emailText, setEmailText] = useState("");
  const [emailInputColor, setEmailInputColor] = useState("default");
  const [email, setEmail] = useState("* 사용 가능한 E-mail을 입력해주세요.");
  const [passColor, setPassColor] = useState(true);
  const [rePassColor, setRePassColor] = useState(true);
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [warn, setWarn] = useState("");
  const [nick, setNick] = useState("");
  const [nickInputColor, setNickInputColor] = useState("defualt");
  const [nickWarn, setNickWarn] = useState("");

  const navigate = useNavigate();

  const checkEmailHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${BASE_API_URI}/email-check`, {
        email: emailText,
      });
      if (response.status === 200 && emailRegEx.test(emailText)) {
        setEmailInputColor("pass");
      } else setEmailInputColor("fail1");
    } catch (error) {
      setEmailInputColor("fail2");
    }
  };

  const checkNickHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${BASE_API_URI}/nick-check`, {
        nick: nick,
      });
      if (response.status === 200) {
        setNickInputColor("pass");
      }
    } catch (error) {
      setNickInputColor("fail");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (
        emailInputColor === "default" ||
        emailInputColor === "fail1" ||
        emailInputColor === "fail2"
      ) {
        setWarn("E-mail을 확인해주세요.");
      } else if (!passColor || !rePassColor || pass === "" || rePass === "") {
        setWarn("비밀번호를 확인해주세요.");
      } else if (nick === "") {
        setWarn("닉네임을 확인해주세요.");
      } else {
        const response = await axios.post(`${BASE_API_URI}/signup`, {
          name: nick,
          email: emailText,
          password: pass,
        });
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (emailInputColor === "default") {
      setEmail("* 사용 가능한 E-mail을 입력해주세요.");
    } else if (emailInputColor === "fail1") {
      setEmail(" 정확한 이메일을 입력해주세요.");
    } else if (emailInputColor === "fail2") {
      setEmail(" 중복된 E-mail이 존재합니다.");
    } else {
      setEmail(" 사용 가능한 E-mail입니다.");
    }
  }, [emailInputColor]);

  useEffect(() => {
    if (nickInputColor === "fail") {
      setNickWarn("* 중복된 닉네임이 존재합니다");
    } else if (nickInputColor === "pass") {
      setNickWarn(" 사용 가능한 닉네임입니다.");
    }
  }, [nickInputColor]);

  useEffect(() => {
    if (pass !== "") setPassColor(pass.length >= 6);
    else setPassColor(true);
    if (rePass !== "" && pass !== rePass) setRePassColor(false);
    else setRePassColor(true);
  }, [pass, rePass]);

  return {
    emailInputColor,
    email,
    checkEmailHandler,
    emailText,
    setEmailText,
    submitHandler,
    pass,
    setPass,
    passColor,
    rePass,
    setRePass,
    warn,
    setWarn,
    rePassColor,
    nick,
    setNick,
    checkNickHandler,
    nickWarn,
    nickInputColor,
  };
}
