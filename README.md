# palletPAL

_Lam, R., Long, T, Taylor, C._

### Live Site
https://palletpal.netlify.app/

---

## **Background**

There are many challenges that exist in the agricultural space, and this application serves to remedy one of these.

A small-medium sized enterprise (SME) that processes raw seeds and grains in preparation for replanting has been selected. This business also serves as a wholesaler, and stores pallets of bagged seeds and grains in their warehouse, including those that have recently been processed.

This business has limited storage space to cater for the large quantity of seeds and grains that are prepared, particularly during busy seasonal times where a high influx of product occurs. As a result, pallets of seed are regularly stacked on top of each other, often in long, tightly packed lines, which is considered somewhat typical in the industry.

The crowded warehouse environment obscures visibility of many pallets containing bagged seed products, and their associated seed lot reference numbers.

Further to this, storage restrictions can mean that pallets are placed in areas that are not usually designated as storage zones, such as forklift driving spaces. Seed lots are often separated, so that one lot may be divided into many locations in the same warehouse. Infrequent dispatches lead to accumulated products, and frequent dispatches lead to lots being moved and re-arranged to accommodate for the changed landscape. These circumstances eventuate to divided lots, partial lots being obscured behind newer lots, and a hard task to find specific pallets come time to dispatch.

## **Purpose**

Come dispatch, ground staff, such as a forklift driver, or a warehouse manager, will need to know where the desired number of pallets of the required lots are located. These may be buried beneath other pallets, or separated throughout the warehouse, and it is undesirable to have to manually search for these products.

The **palletPAL** application addresses this issue by creating a visual representation of the company warehouse and all available storage sites, where multiple pallets, carrying multiple types of products, can be easily searched for and represented.

Specific products and their palleted position in the warehouse are easily found, allowing for early planning and retrieval without the need to manually search. To support the planning of which particular pallets to retrieve, information is easily produced such as any matching lots and their amounts, which combined with location can assist with picking the most appropriate pallets for more efficient dispatches.

## **Features**

To support this functionality, the application caters for movement of these pallets and contained products as they are shifted, restacked or dispatched. It also allows the creation of new pallets, and adjustment of product volumes on any existing pallets.

Search functionality includes the ability to either search by lots, or by seed types, giving flexibility to the type of dispatch required. This is boosted with a visual representation in the warehouse, for easy location recognition, with additional information supplied such as total amounts of that product in storage.

For effective customisation, warehouses can be assigned locations that are able to hold pallets, and locations that cannot; so that the coloured visual representation is true to the actual warehouse layout. Locations that can hold pallets can be further divided into designated storage sites, and those that are not but could potentially hold overflow capacity (such as forklift navigation areas). This feature better reflects the real-world activity in such industries.

While this application serves a particular business, it can be expanded to be useful for a variety of other small-medium seed and grain processing businesses, wholesalers and even retailers. With some small adjustment, it could serve the single business with multiple storage sheds or warehouses, providing information across numerous storage sites.

## **Tech stack**

PalletPAL utilises a PostgreSQL database where data can be created, read, updated and deleted as required, accepting such requests from the server. Express.js and Node.js form the basis of the backend, and React caters for the user interface in the frontend, forming the full-stack application.

This may sound familiar to the MERN stack, which utilises similar technologies. However, while MERN utilises the MongoDB NoSQL database, the PalletPAL application preferences a relational SQL database using Postgres. This can be recognised as the PERN stack.

## **API that we are using**

Github Link: https://github.com/Coder-Academy-CRT/palletPAL-API 

## **Usage**

You can visit our live site https://palletpal.netlify.app/, create a new warehouse to test out our application.

#### **For running on local**

1. Download the file `palletPAL'and unzip.

2. Use command line to change directory into that unzip folder:
```
cd (path to src folder)
Example: 
cd Downloads/palletPAL
```
3. Once you are in the folder, use command line to install required dependencies:
```
npm install
```
4. To run this React application:
```
npm run dev
```

