import Layout from 'components/layout'
import { useRouter } from 'next/router'
import React from 'react'

const Complete = () => {
  const router = useRouter()
  const { unique_id } = router.query
  console.log(unique_id) //why is this not working?
  return (
    <Layout>
      <div className="flex justify-center">
        <p className="text-3xl p-40">Order Complete with ID: <span className="font-bold">{unique_id}</span> </p>
      </div>
    </Layout> //should add order id as slug and display on page
  )
}

export default Complete
