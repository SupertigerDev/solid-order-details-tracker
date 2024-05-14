import { Show } from "solid-js"

function App() {

  return (
    <div class="bg-white border-gray-400 border-solid border rounded-lg p-6 w-[60vh]">
      <MainDetails/>
      <OrderDetails/>
    </div>
  )
}


const MainDetails = () => {
  return (
    <div class="flex">
      <div class="border-gray-400 border rounded-lg w-28 h-28"></div>
      <Badge/>

    </div>
  )
}


const Badge = () => {
  return (
    <div class="ml-auto bg-[#f8e6c2] rounded-full text-[#4d2f05] text-xs self-start px-3 py-1">
      In progress
    </div>
  )
}


const OrderDetails = () => {
  return (
    <div class="mt-8">
      <div class="font-bold text-3xl">Order #5913</div>
      
      <div class="flex flex-col gap-2 mt-4">
        <div class="flex">
          <Detail title="Item" value="Apple Watch"/>
          <Detail title="Courier" value="UPS"/>
        </div>
        <div class="flex">
          <Detail title="Start time" value="14 Jan 2024"/>
          <Detail title="Address" value="4517 Washington Ave"/>
        </div>
      </div>

      <div class="mt-6 flex gap-2">
        <Button title="Export Details" primary />
        <Button title="Request Confirmation" />
        <Button iconSrc="more.svg" />
      </div>
    </div>
  )
}

const Detail = (props: {title: string, value: string}) => {
  return (
    <div class="flex-1">
      <div class="text-black/60">{props.title}</div>
      <div>{props.value}</div>
    </div>
  )
}

const Button = (props: {title?: string, primary?: boolean, iconSrc?: string}) => {
  return (
    <button classList={{["bg-black text-white"]: props.primary, ["text-black border border-black/20"]: !props.primary}} class="rounded-lg py-2 px-4">
      {props.title}
      <Show when={props.iconSrc}>
        <img class="w-2 h-2" src={props.iconSrc} />
      </Show>
    </button>
  )
}

export default App
