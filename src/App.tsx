import { For, Match, Switch, createResource, type Component } from 'solid-js'
import { Button, Form, Spinner } from 'solid-bootstrap'
import { getUrl } from './utils/fetch'
import ConfigDropdown from './components/ConfigDropdown'

const App: Component = () => {
    const [vehicleConfigs] = createResource(() =>
        getUrl(
            'https://raw.githubusercontent.com/levg34/beamng-modator/new-configs/program/French_Emergency_Skin_Pack_Part1.json'
        )
    )

    const [predefinedConfig] = createResource(() =>
        getUrl('https://raw.githubusercontent.com/levg34/beamng-modator/main/config/config.json')
    )

    function updateConfig(vehicle: string, configName: string, newConfig: string | null): void {
        throw new Error('Function not implemented.')
    }

    return (
        <div>
            <Switch
                fallback={
                    <For each={vehicleConfigs().vehicles}>
                        {(vc: { vehicle: string; configs: { configName: string; newConfig: string | null }[] }) => (
                            <Form.Group>
                                <Form.Label>{vc.vehicle}</Form.Label>
                                <ConfigDropdown
                                    vehicleConfig={vc}
                                    updateConfig={updateConfig}
                                    predefinedConfig={predefinedConfig()}
                                />
                            </Form.Group>
                        )}
                    </For>
                }
            >
                <Match when={vehicleConfigs.loading || predefinedConfig.loading}>
                    <Spinner animation="border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </Spinner>
                </Match>
                <Match when={vehicleConfigs.error || predefinedConfig.error}>Error</Match>
            </Switch>

            <Button>Nope</Button>
        </div>
    )
}

export default App
