!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=3)}([function(t,e,i){},,,function(t,e,i){"use strict";i.r(e);i(0);const{baseURL:n}=ongkirLocalize;var o={get(t){return window.fetch(`${n}${t}`,{method:"GET",headers:{Accept:"application/json"}}).then(this.handleError).then(this.handleContentType).catch(this.throwError)},post(t,e){return window.fetch(`${n}${t}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)}).then(this.handleError).then(this.handleContentType).catch(this.throwError)},handleError:t=>t.ok?t:Promise.reject(t.statusText),handleContentType(t){const e=t.headers.get("content-type");return e&&e.includes("application/json")?t.json():Promise.reject("Oops, we haven't got JSON!")},throwError(t){throw new Error(t)}};const r=jQuery,l={isFirstRun:!0,init(){document.querySelector("body").classList.contains("woocommerce-checkout")&&(r(document).on("change","#billing_country, #shipping_country",this.toggleCityField.bind(this)),r(document).on("change","#billing_state, #shipping_state",this.populateCitiesDropdown.bind(this)),this.createFields(),r(document).on("change","#_billing_city, #_shipping_city",this.populateDistrictsDropdown.bind(this)),r(document).on("change","#_billing_district, #_shipping_district",this.fillCityField.bind(this)))},createFields(){document.querySelectorAll("#billing_city, #shipping_city").forEach(async t=>{const e="billing_city"===t.getAttribute("id")?"billing":"shipping",i=t.closest(".woocommerce-billing-fields, .woocommerce-shipping-fields"),n=t.closest("#billing_city_field, #shipping_city_field");let l=i.querySelector("#billing_state, #shipping_state").value;l=l||"0";let c=t.value.match(/\[(\d+)\]/);c=c?c[1]:"0";const s=await o.get(`/fields/${e}/${l}/${c}`);r(n).after(s)}),this.toggleCityField({currentTarget:document.querySelector("#billing_country, #shipping_country")})},toggleCityField(t){const e=t.currentTarget.closest("form");"ID"===t.currentTarget.value?e.classList.add("has-ongkir-dropdown"):e.classList.remove("has-ongkir-dropdown")},async populateCitiesDropdown(t){const e=r(t.currentTarget).val()||"0",i=r(t.currentTarget).closest(".woocommerce-billing-fields, .woocommerce-shipping-fields"),n=i.find("#billing_city_field, #shipping_city_field");this.isFirstRun||n.find("input").val("");const l=i.find("#_billing_city_field select, #_shipping_city_field select");l.html("<option>Loading...</option>");i.find("#_billing_district_field select, #_shipping_district_field select").html("<option>Pilih Kota terlebih dahulu...</option>");const c=await o.get("/cities/"+e);let s="";Object.keys(c).forEach(t=>{s+=`<option value="${t}">${c[t]}</option>`}),l.html(s),l.trigger("change"),this.isFirstRun=!1},async populateDistrictsDropdown(t){const e=r(t.currentTarget).val(),i=r(t.currentTarget).closest(".woocommerce-billing-fields, .woocommerce-shipping-fields"),n=i.find("#billing_state, #shipping_state").val();if(!n)return;const l=i.find("#_billing_district_field select, #_shipping_district_field select");l.html("<option>Loading...</option>");const c=await o.get(`/districts/${n}/${e}`);let s="";Object.keys(c).forEach(t=>{s+=`<option value="${t}">${c[t]}</option>`}),l.html(s)},fillCityField(t){const e=r(t.currentTarget),i=e.closest(".woocommerce-billing-fields, .woocommerce-shipping-fields").find("#billing_city, #shipping_city");i.val(e.val()),i.trigger("keydown")}};document.addEventListener("DOMContentLoaded",(function(){l.init()})),window.addEventListener("load",(function(){}))}]);