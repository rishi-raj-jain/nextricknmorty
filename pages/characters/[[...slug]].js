import Link from 'next/link';
import Head from 'next/head';
import Logo from '../../components/logo';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../libs/apollo';
import { allCharacters, singleCharacter, countCharPages } from '../../gql/allCharacters';
import { useState } from 'react';

let Title= 'Next & GraphQL | Rick and Morty';
let Description= 'Learn more about the characters of Rick and Morty | A portal to browse rick and morty with next & graphql.';
const logoPath= '/logo.png';

const Character= ({bg, text}) => {
    
    const router = useRouter();
    const [pager, setPager]= useState(1);

    if(router.query.slug){
        
        const { loading, error, data } = useQuery(singleCharacter(router.query.slug[0]));
        if (error) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Oops! Not Found :]</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        if (loading) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Loading...</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        console.log(data);

        Title=  data.characters.results[0].name + ' | Next & GraphQL | Rick and Morty';
        Description= 'Get to know about ' + data.characters.results.length + ' different ' + data.characters.results[0].name + ' | A portal to browse rick and morty with next & graphql.';

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
                <h1 className="my-5 text-center">{data.characters.results[0].name + (data.characters.results.length>1 ? "(s)" : "")}</h1>
                <div className="pb-5 container justify-content-center d-flex flex-row flex-wrap">
                    {
                        data.characters.results.map(
                            (item)=>(
                                <div key={item.id} className="mt-3 col-12 col-sm-6 col-md-4 d-flex flex-column">
                                    <img className="rounded-lg w-100" src={item.image} />
                                    <div className={"mt-3 p-2 w-100 d-flex flex-column rounded-lg border " + bg + " " + text}>
                                        <h5 className="p-2" style={{lineHeight: 1.6}}>
                                            {"Gender"}<br />
                                            <span style={{fontSize: '15px'}}>
                                                {item.gender}
                                            </span><br /><hr className="border" />
                                            {item.origin.type && <span>{"Origin"}<br />
                                            <span style={{fontSize: '15px'}}>
                                                {item.origin.dimension}
                                            </span><br />
                                            <span style={{fontSize: '15px'}}>
                                                {"Type: " + item.origin.type}
                                            </span><br />
                                            <span style={{fontSize: '15px'}}>
                                                {"Name: " + item.origin.name}
                                            </span><br /><hr className="border" /></span>}
                                            {item.species && <span>{"Species"}<br />
                                            <span style={{fontSize: '15px'}}>
                                                {item.species}
                                            </span><br /><hr className="border" /></span>}
                                            {item.status && <span>{"Status"}<br />
                                            <span style={{fontSize: '15px'}}>
                                                {item.status}
                                            </span></span>}
                                        </h5>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>)
        
    }

    else{
        const { loading: loadingA, error: errorA, data: dataA } = useQuery(countCharPages);
        const { loading, error, data } = useQuery(allCharacters(pager));
        if(errorA || loadingA) return <></>;
        const [totalCharCount, setTotalCount]= useState(dataA.characters.info.pages);
        if (error) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Oops! Not Found :]</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        if (loading) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
            <h1>Loading...</h1>
            <Logo style={{height: '200px'}} />
        </div>;
        console.log(data);

        Title= 'Characters | Next & GraphQL | Rick and Morty';

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
                <h1 className="my-5 text-center">{"Characters"}</h1>
                <div className="pb-5 container d-flex flex-row flex-wrap">
                    {
                        data.characters.results.map(
                            (item, index)=>(
                            <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-2">
                                <Link href={"./" + item.name}>
                                    <div className={"w-100 h-100 rounded-lg border " + bg + " " + text} style={{cursor: 'pointer'}}>
                                        <img className="w-100" src={item.image} />
                                        <h5 className="p-2" style={{lineHeight: 1.6}}>
                                            <span style={{fontSize: '15px'}}>
                                                {item.origin.dimension}
                                            </span><br />
                                            {item.name}<br />
                                            <span style={{fontSize: '15px'}}>
                                                {"Gender: " + item.gender}
                                            </span>
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={"d-flex align-items-center justify-content-center pb-4 " + bg + " " + text}>
                {data.characters.info.prev && <button className={"p-2 border rounded-lg " + bg + " " + text} onClick={()=>{setPager(pager-1)}}>
                    Prev
                </button>}
                {data.characters.info.next && <button className={"p-2 border rounded-lg " + bg + " " + text + (data.characters.info.prev ? " ml-3" : "")} onClick={()=>{setPager(pager+1)}}>
                    Next
                </button>}
            </div>
            {totalCharCount && <div className={"d-flex align-items-center justify-content-center pb-4 " + bg + " " + text}>
                <span>
                    {pager}/{totalCharCount}
                </span>
            </div>}
        </>)

    }

}

export default withApollo({ ssr: true })(Character);