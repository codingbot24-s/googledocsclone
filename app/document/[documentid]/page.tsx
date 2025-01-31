import Editor from "./editor";
import Toolbar from "./toolbar";
import Navbar from "./navbar";

interface DocumentIdpageProps {
    params: Promise<{
        documentid: string
    }>
}

export default async function DocumentIdpage({ params }: DocumentIdpageProps) {
 
    const { documentid } =  await params; 

    return (
        
        <div className="min-h-screen bg-[#FAFBFD]">
            <Navbar />
            <Toolbar />
            <Editor />
        </div>
            
        
    )
}