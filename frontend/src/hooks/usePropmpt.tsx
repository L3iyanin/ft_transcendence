/**
 * Prompts a user when they exit the page
 */

 import { useCallback, useContext, useEffect, useRef } from 'react';
 import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
 
 function useConfirmExit(confirmExit: () => boolean, when = true) {
   const { navigator } = useContext(NavigationContext);
 
   useEffect(() => {
	 if (!when) {
	   return;
	 }
 
	 const push = navigator.push;
 
	 navigator.push = (...args: Parameters<typeof push>) => {
	   const result = confirmExit();
	   if (result !== false) {
		 push(...args);
	   }
	 };
 
	 return () => {
	   navigator.push = push;
	 };
   }, [navigator, confirmExit, when]);
 }
 
 export default function usePrompt(message: string, when = true) {
   useEffect(() => {
	 if (when) {
	   window.onbeforeunload = function () {
		 return message;
	   };
	 }
 
	 return () => {
	   window.onbeforeunload = null;
	 };
   }, [message, when]);
 
   const confirmExit = useCallback(() => {
	 const confirm = window.confirm(message);
	 return confirm;
   }, [message]);
   useConfirmExit(confirmExit, when);
 }

export const usePrevLocation = (location: any) => {

	const prevLocRef = useRef(location)
	
	useEffect(()=>{

		console.log("location", location.pathname);
		console.log(`prevLocRef.current.pathname`, prevLocRef.current.pathname);

		if (location.pathname !== prevLocRef.current.pathname) {
			console.log("prevLocRef.current", prevLocRef.current)
			prevLocRef.current = location
		}
	
	
	},[location])
	
	return prevLocRef.current
	
	}