export const authGuard = (error) =>{
    console.log("auth 1");
    if (error?.message.includes("auth")) {
        console.log("auth 2");
        location.href = '/zaloguj-sie';
    }
}