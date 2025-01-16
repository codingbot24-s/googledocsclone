import Editor from "./editor";
interface DocumentIdpageProps {
    params: Promise<{
        documentid: string
    }>
}

export default async function DocumentIdpage({ params }: DocumentIdpageProps) {
 
    const { documentid } =  await params; 

    return (
        
        <div className="min-h-screen bg-[#FAFBFD]">
            <Editor />
        </div>
            
        
    )
}