import { useAdminStore } from '@/stores/AdminStore';

const adminAuthGuard = (to: any, from: any, next: any): void => {

  const adminStore = useAdminStore();

  const adminStatus: "SUPERADMIN" | "ADMIN" | "GENERIC" | "GUEST" = adminStore.adminData.status;

  // vérifie si l'administrateur est connecté
  if (adminStore.isConnected && adminStatus !== 'ADMIN') {
    // si connecté, autorise l'accès à la route demandée
    next();
  } 
  else if (adminStore.isConnected && adminStatus === 'ADMIN') {
    next('/forbidden-route');
  }
  else {
    // si non connecté, redirige vers la page de connexion
    next('/'); 
  }
};

export default adminAuthGuard;