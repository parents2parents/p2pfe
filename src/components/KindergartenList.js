import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Kindergarten from './Kindergarten'

export const KINDERGARTEN_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`

class KindergartenList extends Component {
    _updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({query: KINDERGARTEN_QUERY})

        const votedLink = data.feed.links.find(link => link.id === linkId)
        votedLink.votes = createVote.link.votes

        store.writeQuery({query: KINDERGARTEN_QUERY, data})
    }

    render() {
        return (
            <Query query={KINDERGARTEN_QUERY}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <div>Fetching</div>
                    }
                    if (error) {
                        return <div>Error</div>
                    }

                    const linksToRender = data.feed.links

                    return (
                        <div>
                            {linksToRender.map((link, index) => (
                                <Kindergarten key={link.id}
                                              link={link}
                                              index={index}
                                              updateStoreAfterVote={this._updateCacheAfterVote}
                                />
                            ))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default KindergartenList