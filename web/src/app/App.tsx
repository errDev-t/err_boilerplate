import React, { useState, useEffect } from "react";
import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";
import ScaleFade from "@/transitions/ScaleFade";
import { useNuiEvent } from "@/hooks/useNuiEvent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setClipboard } from "@/utils/setClipboard";
import LibIcon from "@/components/LibIcon";

// This will set the NUI to visible if we are developing in browser
debugData([
    {
        action: "showUi",
        data: true,
    },
]);

interface ReturnClientDataCompProps {
    data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({ data }) => (
    <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-muted-foreground flex items-center">
                <LibIcon icon="terminal" className="mr-1 h-3 w-3" />
                System Data
            </h5>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setClipboard(JSON.stringify(data, null, 2))}
                title="Copy to clipboard"
            >
                <LibIcon icon="clipboard" className="h-3 w-3" />
            </Button>
        </div>
        <ScrollArea className="h-[100px] w-full rounded-md border p-2 bg-black/10">
            <Code className="text-xs">
                {JSON.stringify(data, null, 2)}
            </Code>
        </ScrollArea>
    </div>
);

interface ReturnData {
    x: number;
    y: number;
    z: number;
}

const App: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [clientData, setClientData] = useState<ReturnData | null>(null);

    useNuiEvent<boolean>("showUi", (data) => {
        setVisible(true);
    });

    useNuiEvent("hideHub", () => setVisible(false));

    const handleGetClientData = () => {
        fetchNui<ReturnData>("getClientData")
        .then((retData) => {
            console.log("Got return data from client scripts:");
            setClientData(retData);
        })
        .catch((e) => {
            console.error("Setting mock data due to error", e);
            setClientData({ x: 500, y: 300, z: 200 });
        });
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && visible) {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible]);

    const handleClose = () => {
        setVisible(false);
        setClientData(null);
        fetchNui("hideFrame");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <ScaleFade visible={visible}>
                <div className="w-full max-w-md">
                    <Card className="border-border/40 bg-card/95 shadow-xl">
                        <CardHeader className="relative">
                            <div className="absolute right-4 top-4">
                                <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 rounded-full">
                                    <LibIcon icon="xmark" className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="bg-primary/10 text-primary px-2 py-1">
                                    <LibIcon icon="map-pin" className="mr-1 h-3 w-3" />
                                    Interface
                                </Badge>
                            </div>
                            <CardTitle className="text-xl mt-2">System Interface</CardTitle>
                            <CardDescription>
                                Access system data and controls
                            </CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Press ESC key to exit this interface or use the close button.
                                </p>

                                <Button 
                                    onClick={handleGetClientData} 
                                    className="w-full"
                                    variant="default"
                                >
                                    <LibIcon icon="database" className="mr-2 h-4 w-4" />
                                    Fetch Coordinates Data
                                </Button>

                                {clientData && <ReturnClientDataComp data={clientData} />}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScaleFade>
        </div>
    );
};

export default App;