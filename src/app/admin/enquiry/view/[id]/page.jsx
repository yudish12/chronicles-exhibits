
import { getEnquiryById } from '@/server/actions/forms';
import React from 'react'

const Page = async ({params}) => {
    const paramsRes = await params;
    const id = paramsRes.id
    console.log(id);

    const resp = await getEnquiryById(id);
    console.log(resp);

    return (
        <div>Page</div>
    )
}

export default Page