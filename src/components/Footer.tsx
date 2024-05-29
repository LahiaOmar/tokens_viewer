import { VscGithubInverted } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center p-2 text-lg">
      <p>Made With ❤️ </p>
      <div className="flex space-x-3">
        <a target="_blank" href="https://github.com/LahiaOmar/tokens_viewer" > <VscGithubInverted className="w-7 h-7" /></a>
        <a target="_blank" href="https://x.com/df_trainX" > <BsTwitterX className="w-7 h-7" /></a>
      </div>
    </div>
  )
}

export default Footer
