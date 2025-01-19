"use client";
import {  PropsWithChildren, createContext, useContext, useState } from "react";

const TabContext = createContext({
    selectedTab:"",
    filePath:"",
    updateSelectedTab: (Tab:string)=>{},
    updateFilePath: (path:string)=>{}
})

const TabProvider = ({children}:PropsWithChildren)=>{
    const [selectedTab, setSelectedTab] = useState("Home");
    const [filePath, setFilePath] = useState("");

    const updateSelectedTab = (Tab:string)=>{
        setSelectedTab(Tab);
    }
    const updateFilePath = (path:string)=>{
        setFilePath(path);
    }


    return <TabContext.Provider value={{selectedTab,filePath,updateSelectedTab, updateFilePath}}>
        {children}
    </TabContext.Provider>


}



export default TabProvider

export const useTab = ()=>useContext(TabContext)