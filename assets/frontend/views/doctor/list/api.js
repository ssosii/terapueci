import axios from 'axios'
import useApi from "./../../../lib/api/useApi";

export const api = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com'
    baseURL: '/'
})

export const getPostsPage = async (pageParam = 1, selectedCategories = {}) => {

    const masterCategories = JSON.stringify([...selectedCategories.masterCategories, ...selectedCategories.masterCategories, ...selectedCategories.masterCategories]);
    const categories = JSON.stringify([...selectedCategories.problem, ...selectedCategories.service, ...selectedCategories.specialization]);
    const langues = JSON.stringify(selectedCategories.langue);
    const gender = JSON.stringify(selectedCategories.gender);
    const weekDays = JSON.stringify(selectedCategories.weekDays);
    const ranges = JSON.stringify(selectedCategories.ranges);


    // const response = await api.get(`/posts?_page=${pageParam}`, options)
    // console.log("resp", response.data);


    //     const [fetch] = useApi();
    //   const newData =  await fetch(`/api-fetch-doctors-list/${pageParam}`, 'get')
    //         .then((response) => {
    //             // const markedList = response.doctorsList;
    //             // setDoctors(markedList);
    //         })
    //         .catch((error) => {
    //             console.log("error", error);
    //             // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

    //         }).finally(() => {
    //             // setIsSending(false);
    //             // setIsInitDoctorList(true);
    //             // setIsLoading(false);
    //         });

    console.log("send", `api-fetch-doctors-list/${pageParam}`, { categories, langues, gender, weekDays, ranges });

    const newData = await api.post(`api-fetch-doctors-list/${pageParam}`, { categories, langues, gender, weekDays, ranges ,masterCategories  })

    console.log("newData", newData.data.doctorsList, newData.data);
    return newData.data.doctorsList

}
