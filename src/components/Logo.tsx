import { logo } from "@/assets"

const Logo = () => {
  return (
    <div className="flex items-center gap-3 font-bold text-lg">
      <img src={logo} alt="TaskJoy" className="w-6 h-6"/>
      TaskJoy
    </div>
  )
}

export default Logo
