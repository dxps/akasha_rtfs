export type ServiceStatus = 'ok' | 'degraded' | 'down'

export interface HealthResponse {
	appName: string
	checkedAt: string
	status: ServiceStatus
}

export const appInfo = {
	name: 'Akasha',
	description: 'An ontology-based knowledge graph management system',
} as const

export const apiRoutes = {
	health: '/health',
} as const

export const jsonHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json',
} as const

export function createHealthResponse(status: ServiceStatus): HealthResponse {
	return {
		appName: appInfo.name,
		checkedAt: new Date().toISOString(),
		status,
	}
}
