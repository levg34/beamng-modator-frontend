import { Match, Switch, createResource, type Component } from 'solid-js'
import { Button, Spinner } from 'solid-bootstrap'
import { getUrl } from './utils/fetch'
import ConfigDropdown from './components/ConfigDropdown'

const App: Component = () => {
    const [vehicleConfigs] = createResource(() =>
        getUrl(
            'https://raw.githubusercontent.com/levg34/beamng-modator/new-configs/program/French_Emergency_Skin_Pack_Part1.json'
        )
    )

    const [prefedinedConfigs] = createResource(() =>
        getUrl('https://raw.githubusercontent.com/levg34/beamng-modator/main/config/config.json')
    )

    function updateConfig(vehicle: string, configName: string, newConfig: string | null): void {
        throw new Error('Function not implemented.')
    }

    return (
        <div>
            <Switch
                fallback={vehicleConfigs().vehicles.map(
                    (vc: { vehicle: string; configs: { configName: string; newConfig: string | null }[] }) => (
                        <ConfigDropdown
                            vehicleConfig={vc}
                            updateConfig={updateConfig}
                            prefedinedConfigs={prefedinedConfigs()}
                        />
                    )
                )}
            >
                <Match when={vehicleConfigs.loading}>
                    <Spinner animation="border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </Spinner>
                </Match>
                <Match when={vehicleConfigs.error}>Error</Match>
            </Switch>

            <Button>Nope</Button>
        </div>
    )
}

export default App
