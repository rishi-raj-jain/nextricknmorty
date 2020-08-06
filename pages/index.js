import Link from 'next/link';
import Logo from '../components/logo';
import { withApollo } from '../libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import EpisodeCard from '../components/epiCard';
import { singleEpisode, allEpsiodes, allCharacters } from '../gql/allCharacters';

const IndexPage = ({bg, text}) => {

	const { loading, error, data } = useQuery(singleEpisode("Pilot"));
	const { loading: loadingE, error: errorE, data: dataE } = useQuery(allEpsiodes(1));
	const { loading: loadingC, error: errorC, data: dataC } = useQuery(allCharacters(1));
	if (error) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
		<h1>Oops! Not Found :]</h1>
		<Logo style={{height: '200px'}} />
	</div>;
	if (loading) return <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
		<h1>Loading...</h1>
		<Logo style={{height: '200px'}} />
	</div>;
	
	const Background= data.episodes.results[0].id%2==0 ? "/dumbEasier.jpg" : "/episodePaper.png";
	return (
		<>
			<div className={"pt-5 container-fluid d-flex flex-column " + bg + " " + text}>
				<div className="container">
					<h2>
						Latest Epsiode
					</h2>
				</div>
				{data && <Link href={"/episodes/" + data.episodes.results[0].name}>
					<div className="mt-3 container rounded py-5" style={{backgroundImage: `linear-gradient(#00000080, #00000080), url(${Background})`, backgroundSize: 'cover', minHeight: '300px', backgroundPosition: 'center, center', cursor: 'pointer'}} >
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
				</Link>}
				{errorE && <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
					<h1>Oops! Not Found :]</h1>
					<Logo style={{height: '200px'}} />
				</div>}
				{loadingE && <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
					<h1>Loading...</h1>
					<Logo style={{height: '200px'}} />
				</div>}
				{dataE && <div className="py-5 container d-flex flex-column">
					<div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
						<h2 className="ml-2">
							Episodes
						</h2>
						<Link href="/episodes">
							<h3 style={{cursor: 'pointer'}}>
								View all episodes &rarr;
							</h3>
						</Link>
					</div>
					<div className="py-3 d-flex flex-row flex-wrap">
						{
							dataE.episodes.results.map((item, index)=>(
									index<8 && <EpisodeCard key={index} item={item} bg={bg} text={text} />
								)
							)
						}
					</div>
				</div>}
				{errorC && <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
					<h1>Oops! Not Found :]</h1>
					<Logo style={{height: '200px'}} />
				</div>}
				{loadingC && <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '80vh'}}>
					<h1>Loading...</h1>
					<Logo style={{height: '200px'}} />
				</div>}
				{dataC && <div className="py-5 container d-flex flex-column">
					<div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
						<h2 className="ml-2">
							Characters
						</h2>
						<Link href="/characters">
							<h3 style={{cursor: 'pointer'}}>
								View all characters &rarr;
							</h3>
						</Link>
					</div>
					<div className="d-flex flex-row flex-wrap">
						{
							dataC.characters.results.map(
								(item, index)=>(
									index<8 && <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-2">
										<Link href={"./characters" + item.name}>
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
				</div>}
			</div>
		</>
	)
	
};

export default withApollo({ ssr: true })(IndexPage);