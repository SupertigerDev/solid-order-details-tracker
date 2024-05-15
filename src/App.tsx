import { For, Setter, Show, createSignal } from "solid-js"

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = createSignal(0)



  return (
    <div class="bg-white border-gray-400 border-solid border rounded-lg overflow-hidden w-[600px]">
      <div class="p-6 pb-2">
      <MainDetails/>
      <OrderDetails/>
      <Tabs selectedIndex={selectedTabIndex()} setSelectedIndex={setSelectedTabIndex}/>
      <Show when={selectedTabIndex() === 0}><OrderHistoryTab /></Show>
      </div>
      <Footer/>
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



const Tabs = (props: {selectedIndex: number, setSelectedIndex: Setter<number>}) => {

  const tabs = [
    "Order History",
    "Item Details",
    "Courier",
    "Receiver"
  ]
  return (
    <div class="flex mt-4 border-b border-b-solid border-b-gray gap-4">
      <For each={tabs}>
        {(tab, i) => <Tab title={tab} selected={i() === props.selectedIndex} onClick={() => props.setSelectedIndex(i())} />}
      </For>
    </div>
  )
}
const Tab = (props: {title: string, selected: boolean, onClick?: () => void}) => {
  return (
    <button onClick={props.onClick} classList={{["text-[#00753b] border-b-[#00753b]"]: props.selected}} class=" translate-y-[1px] border-b border-b-solid border-b-gray py-3 text-gray-400">
      {props.title}
    </button>
  )
}


const Footer = () => {
  return (
    <div class="flex h-10 px-4 items-center shrink-0 border-t border-t-solid border-t-gray-400">
      <div class="text-gray-500 text-sm flex-1">Order 1 of 13</div>
      <div class="text-gray-500 text-sm">Next order</div>
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


interface HistoryUpdate {
  title: string
  date: string
  service?: string
  estimate?: string
  trackingNumber?: string,
  warehouse?: string,
  showDetailsButton?: boolean
}
const OrderHistoryTab = () => {

  const updates = [
    {
      title: "Product Shipped",
      date: "13/09/2023 5:23 pm",
      service: "UPS. R. Gosling",
      estimate: "15/09/2023",
      showDetailsButton: true
    },
    {
      title: "Product Packaging",
      date: "13/09/2023 4:13 pm",
      trackingNumber: "3409-4934-4253",
      warehouse: "Apple Spot 13b",
      showDetailsButton: true
    },
    {
      title: "Order Confirmed",
      date: "13/09/2023 3:53 pm",
    },
    {
      title: "Order Placed",
      date: "13/09/2023 3:43 pm",
    }
  ]

  return (
    <div class="mt-2">
      <For each={updates}>
        {(update, i) => <OrderHistoryItem update={update} first={i() === 0} last={i() === updates.length - 1}/>}
      </For>
    </div>
  )
}


const OrderHistoryItem = (props: {first?: boolean, last?: boolean, update: HistoryUpdate}) => {
  return (
    <div class="flex">
      <div class="w-6 max-h-fit shrink-0 flex flex-col items-center gap-1">
        <div classList={{"bg-transparent": props.first}} class="w-px h-3.5 bg-gray-200"></div>
        <div class="w-1.5 h-1.5 shrink-0 bg-gray-400 rounded "/>
        <Show when={!props.last}><div class="w-px h-full bg-gray-200"></div></Show>
      </div>

      <div class="py-2 pl-2 flex-1">
        <div>
          <div class="flex ">
            <div class="flex-1">{props.update.title}</div>
            <Show when={props.update.showDetailsButton}><div class="text-[#00753b]">See Details</div></Show>
          </div>
          <div class="text-gray-400 text-sm">{props.update.date}</div>
        </div>

        <Show when={props.update.title === "Product Shipped"}>
          <div class="mt-2 text-sm">
            <div>Courier Service: {props.update.service}</div>
            <div>Estimated Delivery Date: {props.update.estimate}</div>
          </div>
        </Show>

        <Show when={props.update.title === "Product Packaging"}>
          <div class="mt-2 text-sm">
            <div>Tracking number: {props.update.trackingNumber}</div>
            <div>Warehouse: {props.update.warehouse}</div>
          </div>
        </Show>

      </div>

    </div>
  )
}



export default App
