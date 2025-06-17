export const useRouteName = (path: string): string => {
    const baseRoute = path.split('/')[1] || 'VeloxiAI - Accelerates your creativity with cutting-edge AI tools.';
    return baseRoute.charAt(0).toUpperCase() + baseRoute.slice(1);
};

