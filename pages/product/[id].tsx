import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'


const https = require('https')
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
// Cuales son todas las paginas que va a generar
// build time

export const getStaticPaths = async () => {
  const response = await fetch('https://avostore-glpbsqfg9-draco2505.vercel.app/api/avo', {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        agent: httpsAgent,
    } as RequestInit )
   const { data: productList } : TAPIAvoResponse = await response.json()      
   const paths = productList.map(( { id } ) =>({
      params: { id }
   }))

   return {
     paths,
     // incremental static generation
     // Si la página n se especifica en la variable paths dara un 404 en nextjs
     fallback: false
   }
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
  
  const id = params?.id as string
  const response = await fetch(`https://avostore-glpbsqfg9-draco2505.vercel.app/api/avo/${id}`, {
 
        // Adding method type
        method: "GET",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        agent: httpsAgent,
    } as RequestInit )
      const product : TProduct = await response.json()      
      
  return {
    props: {
      product,
    }
  }
}

// Pagina dinamica

const ProductPage = ({product} : {product : TProduct}) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
