import Link from 'next/link';
import Head from 'next/head';
import Logo from '../../components/logo';
import EpisodeCard from '../../components/epiCard';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../libs/apollo';
import { allEpsiodes, singleEpisode, countEpiPages } from '../../gql/allCharacters';
import { useState } from 'react';

let Title= 'Next & GraphQL | Rick and Morty';
let Description= 'A portal to browse rick and morty episodes with next & graphql.';
const logoPath= '/logo.png';

const EpisodeOs= ({bg, text}) => {
    
    const router = useRouter();
    const [pager, setPager]= useState(1);
    console.log(router.query.slug);

    if(router.query.slug){
        
        const { loading, error, data } = useQuery(singleEpisode(router.query.slug[0]));
        if (error) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Oops! Not Found :]</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        if (loading) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Loading...</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        console.log(data);
        const Background= data.episodes.results[0].id%2==0 ? "/dumbEasier.jpg" : "/episodePaper.png";
        Title=  data.episodes.results[0].episode + ' - ' + data.episodes.results[0].name + ' | Next & GraphQL | Rick and Morty';

        return (
            <>
                <Head>
                    <title>{Title}</title>
                    <meta name="og:url" property="og:url" content="" />
                    <meta name="og:type" property="og:type" content="website" />
                    <meta name="og:title" property="og:title" content={Title} />
                    <meta name="og:description" property="og:description" content={Description} />
                    <meta name="og:image" property="og:image" content={logoPath} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={Title} />
                    <meta name="twitter:description" content={Description} />
                    <meta name="twitter:image" content={logoPath} />
                </Head>
                <div className={"pt-5 container-fluid d-flex flex-column " + bg + " " + text}>
                    <div className="mt-3 container rounded py-5" style={{backgroundImage: `linear-gradient(#00000080, #00000080), url(${Background})`, backgroundSize: 'cover', minHeight: '300px', backgroundPosition: 'center, center'}} >
                        <div className="d-flex flex-column">
                            <span className="text-white" style={{fontSize: '20px'}}>
                                {data.episodes.results[0].episode}
                            </span>
                            <h1 className="py-3 text-white" style={{wordBreak: 'break-word'}}>
                                {data.episodes.results[0].name}
                            </h1>
                            <span className="text-white" style={{fontSize: '15px'}}>
                                {"Air Date: " + data.episodes.results[0].air_date}
                            </span><br />
                        </div>
                    </div>
                    <div className="py-5 container d-flex flex-column">
                        <h4 className="ml-2">
                            Starring
                        </h4>
                        <div className={"d-flex flex-row flex-wrap align-items-start align-items-stretch justify-content-start"}>
                            {
                                data.episodes.results[0].characters.map((data, index) => 
                                    {
                                        return (
                                            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 p-2">
                                                <Link href={"/characters/" + data.name}>
                                                    <div className={"w-100 h-100 rounded-lg border " + bg + " " + text} style={{cursor: 'pointer'}}>
                                                        <img className="w-100" src={data.image} />
                                                        <h5 className="p-2" style={{lineHeight: 1.6}}>
                                                            {data.name}
                                                        </h5>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) 
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        )

    }

    else{
        const { loading: loadingA, error: errorA, data: dataA } = useQuery(countEpiPages);
        const { loading, error, data } = useQuery(allEpsiodes(pager));
        if(errorA || loadingA) return <></>;
        const [totalEpiCount, setTotalCount]= useState(dataA.episodes.info.pages);
        if (error) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Oops! Not Found :]</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        if (loading) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Loading...</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        console.log(data);

        Title= 'Episodes | Next & GraphQL | Rick and Morty';

        return (<>
            <Head>
				<title>{Title}</title>
				<link rel="icon" href={logoPath} />
				<meta name="og:url" property="og:url" content="" />
				<meta name="og:type" property="og:type" content="website" />
				<meta name="og:title" property="og:title" content={Title} />
				<meta name="og:description" property="og:description" content={Description} />
				<meta name="og:image" property="og:image" content={logoPath} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={Title} />
				<meta name="twitter:description" content={Description} />
				<meta name="twitter:image" content={logoPath} />
			</Head>
            <div className={"container-fluid " + bg + " " + text}>
                <h1 className="my-5 text-center">{"Episodes"}</h1>
                <div className="pb-5 container d-flex flex-row flex-wrap">
                    {
                        data.episodes.results.map((item, index)=>(
                                <EpisodeCard key={index} item={item} bg={bg} text={text} />
                            )
                        )
                    }
                </div>
            </div>
            <div className={"d-flex align-items-center justify-content-center pb-3 " + bg + " " + text}>
                {data.episodes.info.prev && <button className={"p-2 border rounded-lg " + bg + " " + text} onClick={()=>{setPager(pager-1)}}>
                    Prev
                </button>}
                {data.episodes.info.next && <button className={"p-2 border rounded-lg " + bg + " " + text + (data.episodes.info.prev ? " ml-3" : "")} onClick={()=>{setPager(pager+1)}}>
                    Next
                </button>}
            </div>
            {totalEpiCount && <div className={"d-flex align-items-center justify-content-center pb-3 " + bg + " " + text}>
                <span>
                    {pager}/{totalEpiCount}
                </span>
            </div>}
        </>)
    }
}

export default withApollo({ ssr: true })(EpisodeOs);