import { For, createSignal } from 'solid-js'
import { Form, InputGroup } from 'solid-bootstrap'

type VehicleConfig = {
    vehicle: string
    configs: Array<{ configName: string; newConfig: string | null }>
}

type Props = {
    vehicleConfig: VehicleConfig
    updateConfig: (vehicle: string, configName: string, newConfig: string | null) => void
    predefinedConfig: Record<string, any>
}

const ConfigDropdown = (props: Props) => {
    const [selectedConfig, setSelectedConfig] = createSignal<string | null>(null)

    const handleSelect = (newConfig: string | null, configName: string) => {
        setSelectedConfig(newConfig)
        props.updateConfig(props.vehicleConfig.vehicle, configName, newConfig)
    }

    return (
        <div>
            <For each={props.vehicleConfig.configs}>
                {(config) => (
                    <InputGroup class="mb-3">
                        <InputGroup.Text>{config.configName}</InputGroup.Text>
                        <Form.Select value={config.newConfig || undefined}>
                            <option>No change</option>
                            <For each={Object.keys(props.predefinedConfig ?? {})}>
                                {(c) => <option value={c}>{c}</option>}
                            </For>
                        </Form.Select>
                    </InputGroup>
                )}
            </For>
        </div>
    )
}

export default ConfigDropdown
