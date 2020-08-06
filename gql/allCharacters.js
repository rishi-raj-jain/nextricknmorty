import gql from 'graphql-tag';

export function allCharacters(a){	
	return gql`
		query allCharacters {
			characters(page: ${a}){
				info{
					prev
					next
				}
				results {
					name
					image
					gender
					origin{
						dimension
					}
				}
			}
		}
	`;
}

export function allEpsiodes(a){	
	return gql`
		query allEpsiodes {
			episodes(page: ${a}){
				info{
					prev
					next
				}
				results {
					id
					name
					created
					air_date
					episode
					characters{
						id
					}
				}
			}
		}
	`;
}

export function singleEpisode(a){
	return gql`
		query singleEpsiode {
			episodes(filter: { name: "${a}"}) {
				results{
					id
					name
					created
					air_date
					episode
					characters{
						image
						name
					}
				}
			}
		}
	`;
}

export function singleCharacter(a){
	return gql`
		query singleCharacter {
			characters(filter: { name: "${a}"}) {
				results{
					id
					name
					image
					status
					species
					gender
					origin{
						name
						dimension
						type
					}
				}
			}
		}
	`;
}

export const latestEpsiode= gql`
	query latestEpsiode {
		episodes {
			info{
				count
			}
		}
	}
`;