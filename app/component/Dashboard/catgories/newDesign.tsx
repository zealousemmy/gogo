import React, { useState } from 'react';
import { CascadeSelect, CascadeSelectChangeEvent } from 'primereact/cascadeselect';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

interface City {
    cname: string;
    code: string;
}

interface CountryState {
    name: string;
    cities: City[];
}

interface Country {
    name: string;
    code: string;
    states: CountryState[];
}

export default function NewCreateCategory() {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [value, setValue] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const countries: Country[] = [
        {
            name: 'Australia',
            code: 'AU',
            states: [
                {
                    name: 'New South Wales',
                    cities: [
                        { cname: 'Sydney', code: 'A-SY' },
                        { cname: 'Newcastle', code: 'A-NE' },
                        { cname: 'Wollongong', code: 'A-WO' }
                    ]
                },
                {
                    name: 'Queensland',
                    cities: [
                        { cname: 'Brisbane', code: 'A-BR' },
                        { cname: 'Townsville', code: 'A-TO' }
                    ]
                }
            ]
        },
        {
            name: 'Canada',
            code: 'CA',
            states: [
                {
                    name: 'Quebec',
                    cities: [
                        { cname: 'Montreal', code: 'C-MO' },
                        { cname: 'Quebec City', code: 'C-QU' }
                    ]
                },
                {
                    name: 'Ontario',
                    cities: [
                        { cname: 'Ottawa', code: 'C-OT' },
                        { cname: 'Toronto', code: 'C-TO' }
                    ]
                }
            ]
        },
        {
            name: 'United States',
            code: 'US',
            states: [
                {
                    name: 'California',
                    cities: [
                        { cname: 'Los Angeles', code: 'US-LA' },
                        { cname: 'San Diego', code: 'US-SD' },
                        { cname: 'San Francisco', code: 'US-SF' }
                    ]
                },
                {
                    name: 'Florida',
                    cities: [
                        { cname: 'Jacksonville', code: 'US-JA' },
                        { cname: 'Miami', code: 'US-MI' },
                        { cname: 'Tampa', code: 'US-TA' },
                        { cname: 'Orlando', code: 'US-OR' }
                    ]
                },
                {
                    name: 'Texas',
                    cities: [
                        { cname: 'Austin', code: 'US-AU' },
                        { cname: 'Dallas', code: 'US-DA' },
                        { cname: 'Houston', code: 'US-HO' }
                    ]
                }
            ]
        }
    ];

    const countryOptionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center gap-2">
                {option.states && <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />}
                {option.cities && <i className="pi pi-compass" />}
                {option.cname && <i className="pi pi-map-marker" />}
                <span>{option.cname || option.name}</span>
            </div>
        );
    };

    const countryFormTemplate = (option: any) => {
        return (
            <div className="flex align-items-center gap-2">
                <input type="text" />
                {/* {option.states && <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />} */}
                {/* {option.cities && <i className="pi pi-compass" />} */}
                {/* {option.cname && <i className="pi pi-map-marker" />} */}
                {/* <span>{option.cname || option.name}</span> */}
            </div>
        );
    };

    const handleShowAdd = (e: any) => {
        e.preventDefault();
        setShow(true);
    };
    return (
        <div className="card flex justify-content-center bg-dark">
            <form>
                <div>
                    <div className="mb-3 flex justify-content-end" style={{}}>
                        <button onClick={handleShowAdd}>+</button>
                    </div>
                    {show === true && (
                        <CascadeSelect
                            value={selectedCity}
                            onChange={(e: CascadeSelectChangeEvent) => setSelectedCity(e.value)}
                            options={countries}
                            optionLabel="cname"
                            optionGroupLabel="name"
                            optionGroupChildren={['states', 'cities']}
                            className="w-full md:w-14rem"
                            breakpoint="767px"
                            placeholder="Add category"
                            itemTemplate={countryFormTemplate}
                        />
                    )}
                    {show === false && (
                        <CascadeSelect
                            value={selectedCity}
                            onChange={(e: CascadeSelectChangeEvent) => setSelectedCity(e.value)}
                            options={countries}
                            optionLabel="cname"
                            optionGroupLabel="name"
                            optionGroupChildren={['states', 'cities']}
                            className="w-full md:w-14rem"
                            breakpoint="767px"
                            placeholder="Select a City"
                            itemTemplate={countryOptionTemplate}
                        />
                    )}
                </div>
                <span className="p-float-label mt-3">
                    <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                    <label htmlFor="username">Name</label>
                </span>
                <span className="p-float-label mt-3">
                    <InputTextarea id="description" value={value} onChange={(e: any) => setValue(e.target.value)} rows={5} cols={30} />
                    <label htmlFor="description">Description</label>
                </span>
                <div className="mt-3 mx-auto">
                    <Button label="Submit" type="submit" icon="pi pi-check" />
                </div>
            </form>
        </div>
    );
}
