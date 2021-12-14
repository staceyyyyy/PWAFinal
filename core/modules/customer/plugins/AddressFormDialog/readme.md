# description

this plugins to handle add new address

# how to install 

this plugins can install without custome or with custom  template

## without custom template 

if you not install with custom template you only import and place onyour components

example:
````
import AddressFormDialog from '@plugin_addressform';

<AddressFormDialog
    {...dialogProps}
    t={t}
    onSubmitAddress={async (dataAddress) => {
        const { cart } = checkout.data;
        let state = { ...checkout };

        await setAddress(dataAddress, cart);
        state.status.addresses = true;
        setCheckout(state);

        _.delay(() => {
            state = { ...checkout };
            state.status.openAddressDialog = false;
            setCheckout(state);
            state.status.addresses = false;
            setCheckout(state);
        }, CLOSE_ADDRESS_DIALOG);
    }}
    loading={checkout.loading.addresses}
    success={checkout.status.addresses}
    open={checkout.status.openAddressDialog}
    disableDefaultAddress
    setOpen={() => setCheckout({
        ...checkout,
        status: {
            ...checkout.status,
            openAddressDialog: false,
        },
    })}
    pageTitle={t('checkout:address:addTitle')}
/>
````

### Properties

| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageTitle  |  false   | title on plugins     | String|
| setOpen  |  true   | Function to handle toogle open dialog address     | Function|
| open  |  true   | value to notif open address dialog or not    | Boolean|
| disableDefaultAddress  |  false   | value disabled address or not    | Boolean|
| success  |  true   | value success add address or not    | Boolean|
| loading  |  true   | value loading add address or not    | Boolean|
| onSubmitAddress  |  true   | function to submit address    | Function|
| t  |  true   | function to translate    | Function|

## with custom template 

if you  install with custom template you only import core components and place onyour components

example:
````
import AddressFormDialog from '@plugin_addressform/Core';
````
### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| pageTitle  |  false   | title on plugins     | String|
| setOpen  |  true   | Function to handle toogle open dialog address     | Function|
| open  |  true   | value to notif open address dialog or not    | Boolean|
| disableDefaultAddress  |  false   | value disabled address or not    | Boolean|
| success  |  true   | value success add address or not    | Boolean|
| loading  |  true   | value loading add address or not    | Boolean|
| onSubmitAddress  |  true   | function to submit address    | Function|
| t  |  true   | function to translate    | Function|
| Content  |  true   | view component    | Function|

# params to send on custom view

| Props       | Description | Type | params |
| :---        | :---        |:---  | :---   |
| t     |  function to translate      | Function | - |
| open     |   value to detect oen or not address dialog   | Boolean | - |
| setOpen     |  function to toogle open or not address dialog      | Function | `true` or `false` |
| pageTitle     |  page title value string   | String | - |
| formik     |  object data formik  | Object | - |
| addressState     |  data address state form      | Object | - |
| setFromUseEffect     |  toogle use set from use effect or not      | Function | `true` or `false` |
| getCities     |  function to get cities from graphql| Function | ````{ variables: { regionId: 1 } }```` |
| setAddressState     |  function to set address value     | Function | `true` or `false` |
| mapPosition     |  position value maps google     | Float | - |
| handleDragPosition     |  handle drag move maps      | Function | ````{
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            }```` |
| disableDefaultAddress     | value disabled address or not       | - |Boolean |
| loading     |  value loading or not    | Boolean | - |
| success     |  value success add address or not      | Boolean | - |
| gmapKey     |  google maps key value      | string | - |
