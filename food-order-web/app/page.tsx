import WelcomeServiceLink from "@/components/widgets/welcome-service-link"
import { CookingPot, Search01FreeIcons, ShoppingBag02FreeIcons, User02FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function WelcomePage() {
  return (
    <main className="h-screen">

      {/* Hero Section */}
      <section className="bg-linear-to-br from-orange-600 to-orange-300  h-2/3 py-20 px-40 ">
        <div className="grid grid-cols-5 gap-4 h-full">
          <CharWrapper value="f" />
          <CharWrapper value="o" />
          <CharWrapper value="o" />
          <CharWrapper value="d" />
          <div></div>
          <CharWrapper value="o" />
          <CharWrapper value="r" />
          <CharWrapper value="d" />
          <CharWrapper value="e" />
          <CharWrapper value="r" />
        </div>
      </section>

      <section className="h-1/3 grid grid-cols-3 py-10 px-40 gap-10">
        <WelcomeServiceLink 
          bgColor="bg-orange-300" 
          textColor="black"
          icon={ShoppingBag02FreeIcons} 
          title="Take Order" subTitle="Start a new food order." route="/cart" />

        <WelcomeServiceLink 
          bgColor="bg-orange-500" 
          textColor="white"
          icon={Search01FreeIcons} 
          title="Check Status" subTitle="Check your ourder status." route="/check" />

        <WelcomeServiceLink 
          bgColor="bg-orange-700" 
          textColor="white"
          icon={User02FreeIcons} 
          title="Be a member" subTitle="Sign Up to be a member." route="/signin" />
      </section>

    </main>
  )
}

function CharWrapper({value} : {value : string}) {
  return (
    <div className="border-white border-2 flex items-center justify-center">
      <span className="text-white text-6xl uppercase">{value}</span>
    </div>
  )
}