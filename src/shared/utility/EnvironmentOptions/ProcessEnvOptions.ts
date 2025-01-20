import EnvironmentOptions from "./EnvironmentOptions";
import { config } from "dotenv";

export default class ProcessEnvOptions<T> implements EnvironmentOptions<T> {
    static instance:ProcessEnvOptions<any>|null =null;
    private constructor(){
        config();
    }

    static getInstance<T>(): ProcessEnvOptions<T> {
        if (!ProcessEnvOptions.instance) {
            ProcessEnvOptions.instance = new ProcessEnvOptions();
        }
        return ProcessEnvOptions.instance;
    }


    getOrDefault(key: keyof T, defaultValue: any) {
        if ((process.env as  T)[key]) {
            return (process.env as T)[key];
        }
        return defaultValue
    }
   
}