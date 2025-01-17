import Editor from "./editor";
import Toolbar from "./toolbar";


interface DocumentIdpageProps {
    params: Promise<{
        documentid: string
    }>
}

export default async function DocumentIdpage({ params }: DocumentIdpageProps) {
 
    const { documentid } =  await params; 

    return (
        
        <div className="min-h-screen bg-[#FAFBFD]">
            <Toolbar />
            <Editor />
        </div>
            
        
    )
}