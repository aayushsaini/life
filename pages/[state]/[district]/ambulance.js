import React from 'react';
import { getAmbulances } from '../../../lib/api';
import { humanize, statePaths } from '../../../lib/utils';
import AmbulanceCard from '../../../components/AmbulanceCard';
import Head from 'next/head';
import Breadcumb from '../../../components/Breadcumb';

export default function Ambulance({ state, district, ambulancesListing }) {
    return (
        <div>
            <Head>
                <title>
                    Ambulance in {humanize(district)} , {humanize(state)}
                </title>
            </Head>
            <Breadcumb
                list={[
                    { href: `/${state}`, name: humanize(state) },
                    { href: `/${state}/${district}`, name: humanize(district) },
                    { href: null, name: 'Ambulance' }
                ]}
            />
            <div className="w-full space-y-4 mt-4 mb-4">
                {ambulancesListing.map(
                    ({
                        name,
                        phone1,
                        phone2,
                        area,
                        source,
                        id,
                        createdTime,
                        verificationStatus,
                        lastVerifiedOn
                    }) => (
                        <AmbulanceCard
                            key={id}
                            name={name}
                            phone1={phone1}
                            phone2={phone2}
                            area={area}
                            source={source}
                            createdTime={createdTime}
                            verificationStatus={verificationStatus}
                            lastVerifiedOn={lastVerifiedOn}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export async function getStaticProps({ params }) {
    return {
        props: {
            state: params.state,
            district: params.district,
            ambulancesListing: getAmbulances(params.state, params.district, true)
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: statePaths('ambulance'),
        fallback: false
    };
}
