import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import fetch from 'isomorphic-unfetch'

export const getStaticProps = async () => {
  const https = require('https')
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
      const response = await fetch('https://avostore-glpbsqfg9-draco2505.vercel.app/api/avo', {
 
        // Adding method type
        method: "GET",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        agent: httpsAgent,
    } as RequestInit )
      const { data: productList } : TAPIAvoResponse = await response.json()      
      
  return {
    props: {
      productList,
    }
  }
}
// Pagina estatica
const HomePage = ({productList } : {productList : TProduct[]}) => {
  //const [productList, setProductList] = useState<TProduct[]>([])

  return (
    <Layout>
      <KawaiiHeader />
      <ProductList products={productList} />
    </Layout>
  )
}

export default HomePage
