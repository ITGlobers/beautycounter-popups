import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'
import GET_SESSION from '../../graphql/getSession.gql'
import getDocuments from '../../graphql/query.getDocuments.gql'
/* import USERNAME from '../../graphql/getProfile.gql' */
/* import { Spinner } from 'vtex.styleguide' */
import { useLazyQuery, useApolloClient } from 'react-apollo'
import '../../css/styles.css'
const CSS_HANDLES = [
    'wrapper',
    'top_btns',
    'TopButtonTab',
    'tab_container',
    'tab_btns',
    'tab_item',
    'tab_btn',
    'tab_btn_active',
    'tab_item_last',
    'tab_content',
    'tab_content_empty',
    'tab_table',

] as const
 
const FutureTab = () => {
    const [dataListEventsItems, setDataListEventsItems]: any = useState([])
    const [isLoading, setIsLoading]: any = useState(false)
    const apolloClient = useApolloClient()
    const handles = useCssHandles(CSS_HANDLES)
    /*  const {data:user} = useQuery(USERNAME) */
    let email:any = null
    const [getProfile, { data }] = useLazyQuery(GET_SESSION, {
        fetchPolicy: 'cache-and-network',
    })
    useEffect(() => {
        getProfile()
    }, [])
    if(data) {
        if (data.getSession.profile) {
            email = data.getSession.profile.email
        }
    }
    useEffect(() => {
        
        const getEventsList = async () => {
            setIsLoading(true)
            try {

                const { data: { documents }, }: any = await apolloClient.query({
                    query: getDocuments,
                    fetchPolicy: 'network-only',
                    variables: {
                        acronym: 'EP',
                        fields: ['name', 'host', 'datepopup'],
                        where: `owner=${email}`
                    }
                })

                setIsLoading(false)
                setDataListEventsItems(documents)

            } catch (error) {
                setIsLoading(false)
                console.log('error ', error)
            }

        }
        
        getEventsList()  
    }, [])

    return (
        <>
             {isLoading ? (
          <Spinner />
        ) : (
  dataListEventsItems.length == 0 ? <p className={handles.tab_content_empty}>
  It looks like you don't have any Pop-ups. Please click "Create a Pop-up" to begin.
  </p> :
  
<table className={handles.tab_table}>
<thead>
<tr>
    <th>NAME</th>
    <th>DATE</th>
    <th>CLOSE DATE</th>
    <th>HOSTS</th>
    <th>UNIQUE GUESTS</th>
    <th>ORDERS</th>
    <th>QUALIFYING SALES</th>
    <th>PV</th>
    <th>QV</th>
    <th>TOTAL</th>
</tr>
</thead>
<tbody>
{dataListEventsItems.map((item: any, i: any) => (
    <tr key={i}>
        <td>{item.fields[0].value}</td>
        <td>{item.fields[2].value}</td>
        <td>3/16/2022</td>
        <td>{item.fields[1].value}</td>
        <td>0</td>
        <td>0</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>---</td>
    </tr>
))}
</tbody>
</table>

)}
        </>

    )
}

export default FutureTab 