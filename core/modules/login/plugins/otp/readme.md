# Description
this plugins to handle request otp and validation otp

# How to install

## use default view

you can install with default view, import otp and view on your components

````
import OtpBlock from '@core_modules/login/plugins/otp';
import OtpView from '@core_modules/login/plugins/otp/view';
````

then place on your components

example:

````
<OtpBlock
                    setDisabled={setDisabled}
                    type="login"
                    OtpView={OtpView}
                    phoneProps={{
                        name: 'username',
                        placeholder: '+6281234xxxx',
                        value: formik.values.username,
                        onChange: formik.handleChange,
                        error: !!formik.errors.username,
                        errorMessage: formik.errors.username || null,
                    }}
                    codeProps={{
                        name: 'otp',
                        value: formik.values.otp,
                        onChange: formik.handleChange,
                        error: !!(formik.touched.otp && formik.errors.otp),
                        errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                    }}
                />
````

# Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| setDisabled  |  true   | function to toogle disabled or not     | Object|
| type  |  true   | type otp plugins used `login` or `register`      | Object|
| OtpView  |  true   | COmponent view otp plugin  | Function|
| phoneProps  |  true   | object configuration form     | Object|
| codeProps  |  true   | object configuration form    | Object|

# Props send on components

| Props       | Description | Type |
| :---        | :---        |:---  |
| t  |  function to translate     | Function|
| handleSend  |  function to send phone number to get otp     | Function|
| phoneProps  |  data props about phone number field    | Object|
| handlePhone  | function to handle phone number field change    | Object|
| time  |  waiting time to resend otp again     | Number|
| manySend  |  count hoy many send request otp     | Number|
| config  |  configuration object     | Object|
| codeProps  |  data props about code number field      | Object|
| handleOtp  |  function to handle otp code field change     | Function|
| handleCheck  |  function to check otp code     | Function|

# Default View
1. OtpView `@core_modules/login/plugins/otp/view`
