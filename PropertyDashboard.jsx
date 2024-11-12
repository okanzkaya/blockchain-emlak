import React, { useState } from 'react';
import {
  Search,
  Home,
  Clock,
  UserCheck,
  AlertTriangle,
  Filter,
  Map,
  Building,
  History,
} from 'lucide-react';

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const PropertyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    district: 'all',
    priceRange: 'all',
  });

  // Mock Data (blockchain sistemi kurulmadı kurulup api ile çalıştırılabilir olduğunu düşünüyorum.)
  const [properties] = useState([
    {
      id: 'IST001',
      address: 'Bağdat Caddesi',
      district: 'Kadıköy',
      owner: 'Mehmet Kaya',
      status: 'Onaylandı',
      lastUpdated: '2024-03-15',
      price: 12500000,
      type: 'Daire',
      sqft: 185,
      documents: ['tapu.pdf', 'kontrat.pdf', 'belediye_izni.pdf'],
      history: [
        { date: '2024-03-15', event: 'Tapu Tescili Tamamlandı' },
        { date: '2024-03-10', event: 'Belgeler Teslim Edildi' },
        { date: '2024-03-05', event: 'Başvuru Yapıldı' },
      ],
      location: { lat: 40.9632, lng: 29.0638 },
      amenities: ['Otopark', 'Güvenlik', 'Asansör'],
      energyRating: 'B',
      yearBuilt: 2015,
      floor: 5,
      totalFloors: 12,
      heating: 'Doğalgaz Kombi',
    },
    {
      id: 'IST002',
      address: 'Bağdat Caddesi',
      district: 'Beşiktaş',
      owner: 'Mehmet Kaya',
      status: 'İncelemede',
      lastUpdated: '2024-03-14',
      price: 18750000,
      type: 'Ofis',
      sqft: 250,
      documents: ['ruhsat.pdf', 'vergi_levhasi.pdf'],
      history: [
        { date: '2024-03-14', event: 'İnceleme Başlatıldı' },
        { date: '2024-03-12', event: 'Kayıt Oluşturuldu' },
      ],
      location: { lat: 41.0422, lng: 29.0089 },
      amenities: ['24/7 Güvenlik', 'Kapalı Otopark', 'Jeneratör'],
      energyRating: 'A',
      yearBuilt: 2018,
      floor: 8,
      totalFloors: 15,
      heating: 'Merkezi Sistem',
    },
    {
      id: 'IST003',
      address: 'Bağdat Caddesi',
      district: 'Beyoğlu',
      owner: 'Mehmet Kaya',
      status: 'Beklemede',
      lastUpdated: '2024-03-13',
      price: 8900000,
      type: 'Dükkan',
      sqft: 120,
      documents: ['isyeri_ruhsati.pdf'],
      history: [
        { date: '2024-03-13', event: 'Belge Eksiği Bildirimi' },
        { date: '2024-03-08', event: 'Başvuru Alındı' },
      ],
      location: { lat: 41.0359, lng: 28.9773 },
      amenities: ['Vitrin', 'Depo', 'Güvenlik Sistemi'],
      energyRating: 'C',
      yearBuilt: 1950,
      floor: 0,
      totalFloors: 5,
      heating: 'Klima',
    },
  ]);

  const districts = [
    'Kadıköy',
    'Beşiktaş',
    'Şişli',
    'Beyoğlu',
    'Üsküdar',
    'Maltepe',
    'Ataşehir',
    'Sarıyer',
    'Bakırköy',
    'Fatih',
  ];

  const propertyTypes = [
    'Daire',
    'Ofis',
    'Dükkan',
    'Villa',
    'Arsa',
    'Depo',
    'Fabrika',
    'Rezidans',
    'Plaza',
    'İş Hanı',
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalProperties: properties.length,
    verifiedProperties: properties.filter(p => p.status === 'Onaylandı').length,
    pendingVerification: properties.filter(p => p.status === 'Beklemede')
      .length,
    underReview: properties.filter(p => p.status === 'İncelemede').length,
    totalValue: properties.reduce((sum, p) => sum + p.price, 0),
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filters.type === 'all' || property.type === filters.type;
    const matchesStatus =
      filters.status === 'all' || property.status === filters.status;
    const matchesDistrict =
      filters.district === 'all' || property.district === filters.district;

    return matchesSearch && matchesType && matchesStatus && matchesDistrict;
  });

  const formatPrice = price => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderPropertyDetail = () => {
    if (!selectedProperty) return null;

    return (
      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Emlak Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-bold mb-2'>Temel Bilgiler</h3>
              <p>
                <span className='font-semibold'>Adres:</span>{' '}
                {selectedProperty.address}
              </p>
              <p>
                <span className='font-semibold'>İlçe:</span>{' '}
                {selectedProperty.district}
              </p>
              <p>
                <span className='font-semibold'>Malik:</span>{' '}
                {selectedProperty.owner}
              </p>
              <p>
                <span className='font-semibold'>Fiyat:</span>{' '}
                {formatPrice(selectedProperty.price)}
              </p>
              <p>
                <span className='font-semibold'>Türü:</span>{' '}
                {selectedProperty.type}
              </p>
              <p>
                <span className='font-semibold'>Alan:</span>{' '}
                {selectedProperty.sqft} m²
              </p>
              <p>
                <span className='font-semibold'>Kat:</span>{' '}
                {selectedProperty.floor}/{selectedProperty.totalFloors}
              </p>
              <p>
                <span className='font-semibold'>Yapım Yılı:</span>{' '}
                {selectedProperty.yearBuilt}
              </p>
              <p>
                <span className='font-semibold'>Isıtma:</span>{' '}
                {selectedProperty.heating}
              </p>
            </div>
            <div>
              <h3 className='font-bold mb-2'>Özellikler</h3>
              <ul className='list-disc pl-4'>
                {selectedProperty.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
              <h3 className='font-bold mt-4 mb-2'>İşlem Geçmişi</h3>
              <div className='space-y-2'>
                {selectedProperty.history.map((event, index) => (
                  <div
                    key={index}
                    className='flex justify-between border-b pb-2'
                  >
                    <span>{event.event}</span>
                    <span className='text-gray-500'>{event.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className='p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>
          Blockchain Emlak Takip Sistemi
        </h1>
        <p className='text-gray-600'>Merkezi Emlak Kayıt ve Takip Platformu</p>
      </div>

      <div className='mb-6 flex gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
          <input
            type='text'
            placeholder='Adres, malik veya ilçe ara...'
            className='w-full pl-10 pr-4 py-2 border rounded-lg bg-white'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className='px-4 py-2 border rounded-lg flex items-center gap-2 bg-white hover:bg-gray-50'
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter className='h-5 w-5' />
          Filtreler
        </button>
      </div>

      {filterOpen && (
        <Card className='mb-6'>
          <CardContent className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <label className='block mb-2'>Emlak Türü</label>
              <select
                className='w-full p-2 border rounded bg-white'
                value={filters.type}
                onChange={e => setFilters({ ...filters, type: e.target.value })}
              >
                <option value='all'>Tüm Türler</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block mb-2'>Durum</label>
              <select
                className='w-full p-2 border rounded bg-white'
                value={filters.status}
                onChange={e =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value='all'>Tüm Durumlar</option>
                <option value='Onaylandı'>Onaylandı</option>
                <option value='Beklemede'>Beklemede</option>
                <option value='İncelemede'>İncelemede</option>
              </select>
            </div>
            <div>
              <label className='block mb-2'>İlçe</label>
              <select
                className='w-full p-2 border rounded bg-white'
                value={filters.district}
                onChange={e =>
                  setFilters({ ...filters, district: e.target.value })
                }
              >
                <option value='all'>Tüm İlçeler</option>
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Toplam Kayıt</CardTitle>
            <Building className='h-4 w-4 text-gray-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Onaylı Kayıt</CardTitle>
            <UserCheck className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.verifiedProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>İncelenen</CardTitle>
            <Clock className='h-4 w-4 text-yellow-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.underReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Toplam Değer</CardTitle>
            <AlertTriangle className='h-4 w-4 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatPrice(stats.totalValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emlak Kayıtları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-3'>Kayıt No</th>
                  <th className='text-left p-3'>Adres</th>
                  <th className='text-left p-3'>İlçe</th>
                  <th className='text-left p-3'>Malik</th>
                  <th className='text-left p-3'>Durum</th>
                  <th className='text-left p-3'>Fiyat</th>
                  <th className='text-left p-3'>Tür</th>
                  <th className='text-left p-3'>Alan (m²)</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(property => (
                  <tr
                    key={property.id}
                    className='border-b hover:bg-gray-50 cursor-pointer'
                    onClick={() => setSelectedProperty(property)}
                  >
                    <td className='p-3'>{property.id}</td>
                    <td className='p-3'>{property.address}</td>
                    <td className='p-3'>{property.district}</td>
                    <td className='p-3'>{property.owner}</td>
                    <td className='p-3'>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          property.status === 'Onaylandı'
                            ? 'bg-green-100 text-green-800'
                            : property.status === 'Beklemede'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className='p-3'>{formatPrice(property.price)}</td>
                    <td className='p-3'>{property.type}</td>
                    <td className='p-3'>{property.sqft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedProperty && renderPropertyDetail()}

      <div className='mt-4 text-sm text-gray-500 text-center'></div>
    </div>
  );
};

export default PropertyDashboard;
