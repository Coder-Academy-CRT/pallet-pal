import palletpalContext from '../palletpalContext'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

// Components
import App from '../App'
import Warehouse from './warehouse_components/Warehouse'
import Sidebar from './sidebar_components/Sidebar'

import LotList from './sidebar_components/lot_manager/LotList'
import LotCard from './sidebar_components/lot_manager/LotCard'
import CreateLot from './sidebar_components/lot_manager/CreateLot'

import CustomSelect from './sidebar_components/search_window/CustomSelect'
import Summary from './sidebar_components/search_window/Summary'

import AddPallet from './sidebar_components/location_details/AddPallet'
import ProductCard from './sidebar_components/location_details/ProductCard'
import PalletCard from './sidebar_components/location_details/PalletCard'

// Required Data
import testInitialState from '../testInitialState'

describe("App component tests", () => {

  const state = testInitialState()// this is a partial load from warehouse 1 

  function contextedComponent(component) {
    return (
      <palletpalContext.Provider value={ {state} }>
        { component }
      </palletpalContext.Provider>
    )
  }

  /// 1 ///
  it("shows that the App is loading to the Landing Page", () => {
    render(<App/>)
    expect(screen.getByText(/Loading Warehouse List/i)).toBeInTheDocument()
  })

  /// 2 ///
  it("shows that the Warehouse is loading with pallets in place", () => {
    render(
        contextedComponent(<Warehouse/>)
      )
      // checking a variety of pallets, including 11, 31 and 77
      expect(screen.getByText(/11/)).toBeInTheDocument()
      expect(screen.getByText(/31/)).toBeInTheDocument()
      expect(screen.getByText(/77/)).toBeInTheDocument()
  })

   /// 3 ///
   it("shows that the sidebar is rendering correctly", () => {
    render(
        contextedComponent(<Sidebar/>)
      )
      // name is loading correctly
      expect(screen.getByRole('heading', {name: 'warehouse_01'})).toBeInTheDocument()
      // ensure that other sections are loading correctly
      expect(screen.getByText(/search/)).toBeInTheDocument()
      expect(screen.getByText(/details/)).toBeInTheDocument()
      expect(screen.getByText(/lots/)).toBeInTheDocument()
      expect(screen.getByText(/logout/)).toBeInTheDocument()
  })

  /// 4 ///
  it("shows the details in LotList are populating", () => {
    render(
      contextedComponent(<LotList/>)
    )
    expect(screen.getByRole('heading', {name: 'Lot Manager'})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'AUSN121001'})).toBeInTheDocument()
    expect(screen.getByText(/114 kg/i)).toBeInTheDocument()
  })

   /// 5 ///
   it("shows the details in LotCard", () => {
    render(
      contextedComponent(<LotCard lot={ {lot_code: 'AUSN121001', seed_type: 'ryegrass', seed_variety: 'wimmera' }}/>)
    )
    expect(screen.getByRole('button', {id: 'LotCardLhs'})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'AUSN121001'})).toBeInTheDocument()
    expect(screen.getByText(/no stock/i)).toBeInTheDocument()
  })

  /// 6 ///
  it("shows the details in CreateLot", () => {

    render(
      contextedComponent(<CreateLot/>)
    )

    expect(screen.getByRole('heading', {name: 'Create Lot'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'add lot'})).toBeInTheDocument()
    expect(screen.getByLabelText('Please select seed type:')).toBeInTheDocument

    // checks user event and text that then appears
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/Please write in a lot code/i)).toBeInTheDocument()
  })

   // 7 ///
   it("displays the presence of a clickable 'combobox' select", () => {
    render(
      contextedComponent(< CustomSelect />)
    )
    //passes to allow fireEvent click event
    fireEvent.click(screen.getByRole('combobox'))
  })

 
    // 8 ///
   it("displays the correct summary of a search", () => {
    render(
      contextedComponent(< Summary summary={ {kind: 'AUSN121001', bags: 20, totalWeight: 500} }/>)
    )
    // checks heading and summary to client
    expect(screen.getByRole('heading', {name: 'AUSN121001'})).toBeInTheDocument()
    expect(screen.getByText(/500kg in 20 bags/i)).toBeInTheDocument()
 
   })

   /// 9 ///
   it("shows the Product Card summary including total amount", () => {
    render(
      contextedComponent(< ProductCard seedType={'ryegrass'} bagSize={25} numOfBags={40} lotCode={'AUSN121001'} />)
    )
    expect(screen.getByText(/AUSN121001: ryegrass 40 bags 1000kg/i)).toBeInTheDocument()
  })

  /// 10 ///
  it("correctly shows the summary of pallet #7 at location #12", () => {
    render(
      contextedComponent(< PalletCard palletId={7} locationId={12}/>)
    )
    // this pallet has 9 bags @ 30kg each in lot AUSN121013
    expect(screen.getByText(/AUSN121013: ryegrass 9.00 bags 180kg/i)).toBeInTheDocument()
  })

   /// 11 ///
   it("correctly shows a variety of the lots that are in that warehouse", () => {
    render(
      contextedComponent(< AddPallet/>)
    )
    // multiple lots belonging to that warehouse are displayed
    expect(screen.getByText(/AUSN121001/i)).toBeInTheDocument()
    expect(screen.getByText(/AUSN121004/i)).toBeInTheDocument()
    expect(screen.getByText(/AUSN121013/i)).toBeInTheDocument()
    expect(screen.getByText(/AUSN121018/i)).toBeInTheDocument()
    expect(screen.getByText(/AUSN121020/i)).toBeInTheDocument()
  })
})