# Description

this document to using pwa checkout only

# How to install

First, enable & install module checkout [Install Module Checkout](pages/default/readme.md)  

enable config under object ``checkout`` swift config with key `checkoutOnly`

change alias `@home_page` on file `babel.config.json`
and point to module checkout
example :
```
"@home_page": "swift-pwa-core/core/modules/checkout/pages/default"
```

from first load checkout, url must be route to `{HOST}/authentication`
and must bring query state from magento frontend, example `{HOST}/authentciation?state=l2Llxlnlodta0wHyyXGd8qbbim5DBQ58v3D5ooDGWi8%2FsTKMiG4lxcv%2BlEAdzMEH`

