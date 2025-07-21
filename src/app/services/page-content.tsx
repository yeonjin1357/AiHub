import { getServices, getCategories } from '@/lib/api/services';
import { ServicesPageContent } from '@/components/services/services-page-content';

export async function ServicesPageServerContent() {
  try {
    const [services, categories] = await Promise.all([
      getServices(),
      getCategories(),
    ]);

    return (
      <ServicesPageContent 
        initialServices={services} 
        initialCategories={categories} 
      />
    );
  } catch (error) {
    console.error('Error loading services:', error);
    throw error; // error.tsx가 처리
  }
}