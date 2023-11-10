import { h, render, Fragment } from 'preact';
import { forwardRef } from 'preact/compat';
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { Searcher } from './subcomponents/Searcher/Searcher';
import { FeaturesMenu } from './subcomponents/FeaturesMenu/FeaturesMenu';
import { ThemeProvider } from './../../../providers/ThemeProvider';
import "./list.scss";
import { DoctorsList } from './subcomponents/DoctorsList/DoctorsList';
import useApi from "./../../../lib/api/useApi";
import { LoaderCenter } from "./../../../components/Loader/LoaderCenter/LoaderCenter";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query'
import { getPostsPage } from './api'
import { DoctorItem } from './subcomponents/DoctorsList/DoctorItem/DoctorItem';

// const Post = forwardRef(({ post }, ref) => {

//     const postBody = (
//         <Fragment>
//             <h2>{post.title}</h2>
//             <p>{post.body}</p>
//             <p>Post ID: {post.id}</p>
//         </Fragment>
//     )

//     const content = ref
//         ? <article style={{ width: "100%", height: 500, outline: "1px solid red" }} ref={ref}>{postBody}</article>
//         : <article style={{ width: "100%", height: 500, outline: "1px solid red" }}>{postBody}</article>

//     return content
// })


const List = () => {
    const [isInitDoctorList, setIsInitDoctorList] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isInitData, setIsInitData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [searcherValue, setSearcherValue] = useState("");
    const [categoriesList, setCategoriesList] = useState({ masterCategories: [], langue: [], problem: [], service: [], specialization: [], gender: [], weekDays: [], ranges: [] });
    const [masterCategoriesList, setMasterCategoriesList] = useState();
    const [selectedCategories, setSelectedCategories] = useState({ masterCategories:[], langue: [], problem: [], service: [], specialization: [], gender: [], weekDays: [], ranges: [] });
    // const [selectedMasterategories, setSelectedMasterategories] = useState([]);

    const {
        fetchNextPage, //function 
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        error
    } = useInfiniteQuery(['/doctors', selectedCategories], ({ pageParam = 1 }) => getPostsPage(pageParam, selectedCategories), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })


    console.log("query", "data", data, "status", status, "error", error, "fetchNextPage", fetchNextPage, "hasNextPage", hasNextPage);


    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                fetchNextPage()
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    if (status === 'error') return <p className='center'>Error: {error.message}</p>



    const content = data?.pages.map(pg => {
        return pg.map((doctor, i) => {
            if (pg.length === i + 1) {
                return <DoctorItem isDoctor={isDoctor} ref={lastPostRef} key={doctor.id} {...doctor} />
            }
            return <DoctorItem isDoctor={isDoctor} key={doctor.id} {...doctor} />
        })
    })



    useEffect(() => {
        // const [fetch] = useApi();
        // fetch(`/api-fetch-doctors-list/${page}`, 'get')
        //     .then((response) => {
        //         const markedList = response.doctorsList;
        //         setDoctors(markedList);
        //     })
        //     .catch((error) => {
        //         console.log("error", error);
        //         // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

        //     }).finally(() => {
        //         // setIsSending(false);
        //         setIsInitDoctorList(true);
        //         setIsLoading(false);
        //     });

        const [fetch] = useApi();
        fetch('/api-fetch-doctors-list-init-data', 'get')
            .then((response) => {
                console.log("priceList", response);
                // setPricesList(response.pricesList);
                setCategoriesList({ ...categoriesList, ...response.categoriesList });
                setIsDoctor(response.isDoctor);
            })
            .catch((error) => {
                console.log("error", error);
                // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                // setIsSending(false);
                setIsInitData(true);
            });



        // /api-fetch-doctors-list-init-data


    }, []);


    // const fetchData = async (__page) => {

    //     const [fetch] = useApi();
    //     fetch(`/api-fetch-doctors-list/${page}`, 'get')
    //         .then((response) => {
    //             const markedList = response.doctorsList;
    //             setDoctors([doctors, ...markedList]);
    //             setPage(page + 1);
    //         })
    //         .catch((error) => {
    //             console.log("error", error);
    //             // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

    //         }).finally(() => {
    //             // setIsSending(false);
    //             setIsInitDoctorList(true);
    //             setIsLoading(false);
    //         });

    // }

    // const preparedCategories = () =>{
    //     return Object.map(item)
    // }
    // preparedCategories();


    useEffect(() => {
        if (isInitData) {

            setIsLoading(true);
            console.log("searcherValue1", searcherValue);
            if (searcherValue.length > 0) {
                const [fetch] = useApi();
                fetch('/api-fetch-doctor-by-string', { searcherValue }, 'post')
                    .then((response) => {
                        console.log("resp1", response.doctorsList);
                        setDoctors(response.doctorsList);

                    })
                    .catch((error) => {
                        console.log("error", error);

                    }).finally(() => {
                        setIsLoading(false);
                    });
            }

            // else {


            //     const categories = JSON.stringify([...selectedCategories.problem, ...selectedCategories.service, ...selectedCategories.specialization]);
            //     const langues = JSON.stringify(selectedCategories.langue);
            //     const gender = JSON.stringify(selectedCategories.gender);
            //     const weekDays = JSON.stringify(selectedCategories.weekDays);
            //     const ranges = JSON.stringify(selectedCategories.ranges);


            //     console.log("ranges", weekDays, ranges);

            //     const [fetch] = useApi();
            //     fetch('/api-fetch-doctor-by-categories-ranges', { categories, langues, gender, weekDays, ranges }, 'post')
            //         .then((response) => {
            //             console.log("resp2", response.doctorsList);
            //             setDoctors(response.doctorsList);
            //         })
            //         .catch((error) => {
            //             console.log("error", error);

            //         }).finally(() => {
            //             setIsLoading(false);
            //         });


            // }


        }

    }, [searcherValue]);

    return (
        <ThemeProvider>

            <div className="container doctor-list-container">
                <Searcher setSearcherValue={setSearcherValue} />
                {(!isInitData && !isInitDoctorList) ? <LoaderCenter /> : (
                    <Fragment>
                        {searcherValue.length === 0 && (
                            <FeaturesMenu
                                masterCategoriesList={masterCategoriesList}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                categoriesList={categoriesList}
                            // selectedMasterategories={selectedMasterategories}
                            // setSelectedMasterategories={setSelectedMasterategories}
                            />
                        )}

                        {searcherValue.length > 0 ? (
                            <div className='doctor-list'>
                                {isLoading ? <LoaderCenter /> : <DoctorsList doctors={doctors} />}
                            </div>
                        ) : (
                            <div className='doctor-list'>
                                {content}
                                {isFetchingNextPage && <LoaderCenter />}
                                {/* <p className="center"><a href="#top">Back to Top</a></p> */}
                            </div>
                        )}

                    </Fragment>
                )}
            </div>

        </ThemeProvider>

    )
}

export { List }