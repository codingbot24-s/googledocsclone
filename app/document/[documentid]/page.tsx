
interface DocumentIdpageProps {
    params: Promise<{
        documentid: string
    }>
}

export default async function DocumentIdpage({ params }: DocumentIdpageProps) {
 
    const { documentid } =  await params; 

    return (
        <div>
            <h1>Document Id is {documentid}</h1>
        </div>
    )
}